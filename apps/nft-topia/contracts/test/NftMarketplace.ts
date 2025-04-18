import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("NFTMarketplace", function () {
  // Basic fixture to deploy the contract
  async function deployMarketplaceFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();

    return { marketplace, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right contract owner", async function () {
      const { marketplace, owner } = await loadFixture(
        deployMarketplaceFixture,
      );
      expect(await marketplace.owner()).to.equal(owner.address);
    });

    it("Should set the correct listing price", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const listingPrice = await marketplace.getListingPrice();
      expect(listingPrice).to.equal(ethers.parseEther("0.025"));
    });
  });

  describe("NFT Operations", function () {
    it("Should create and list a token", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      await expect(
        marketplace.createToken("tokenURI", auctionPrice, {
          value: listingPrice,
        }),
      ).to.emit(marketplace, "MarketItemCreated");
    });

    it("Should fail if listing price is not sent", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const auctionPrice = ethers.parseEther("1");

      await expect(
        marketplace.createToken("tokenURI", auctionPrice, { value: 0 }),
      ).to.be.revertedWith("Price must be equal to listing price");
    });

    it("Should execute market sale", async function () {
      const { marketplace, owner, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // First create a token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Execute sale
      await expect(
        marketplace.connect(otherAccount).createMarketSale(1, {
          value: auctionPrice,
        }),
      ).to.changeEtherBalances(
        [otherAccount, owner],
        [-auctionPrice, listingPrice],
      );
    });

    it("Should fetch market items", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create two tokens
      await marketplace.createToken("tokenURI1", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.createToken("tokenURI2", auctionPrice, {
        value: listingPrice,
      });

      const items = await marketplace.fetchMarketItems();
      expect(items.length).to.equal(2);
    });
  });

  describe("Resell Token", function () {
    it("Should allow token resell", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");
      const resellPrice = ethers.parseEther("2");

      // Create and sell token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Resell token
      await expect(
        marketplace.connect(otherAccount).resellToken(1, resellPrice, {
          value: listingPrice,
        }),
      ).to.not.be.reverted;
    });
  });

  describe("Additional Operations", function () {
    it("Should allow owner to update listing price", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const newListingPrice = ethers.parseEther("0.05");

      await marketplace.updateListingPrice(newListingPrice);
      expect(await marketplace.getListingPrice()).to.equal(newListingPrice);
    });

    it("Should not allow non-owner to update listing price", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const newListingPrice = ethers.parseEther("0.05");

      await expect(
        marketplace.connect(otherAccount).updateListingPrice(newListingPrice),
      ).to.be.revertedWith(
        "Only marketplace owner can update the listing price",
      );
    });

    it("Should fetch my NFTs", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create and buy a token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts.length).to.equal(1);
    });

    it("Should fetch items listed", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create two tokens
      await marketplace.createToken("tokenURI1", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.createToken("tokenURI2", auctionPrice, {
        value: listingPrice,
      });

      const listedItems = await marketplace.fetchItemsListed();
      expect(listedItems.length).to.equal(2);
    });
  });

  describe("Edge Cases and Additional Validations", function () {
    it("Should fail to create token with zero price", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const listingPrice = await marketplace.getListingPrice();

      await expect(
        marketplace.createToken("tokenURI", 0, { value: listingPrice }),
      ).to.be.revertedWith("Price must be at least 1");
    });

    it("Should fail to resell if not token owner", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Try to resell without owning
      await expect(
        marketplace.connect(otherAccount).resellToken(1, auctionPrice, {
          value: listingPrice,
        }),
      ).to.be.revertedWith("Only item owner can perform this operation");
    });

    it("Should fail market sale if price is not met", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Try to buy with wrong price
      await expect(
        marketplace.connect(otherAccount).createMarketSale(1, {
          value: ethers.parseEther("0.5"),
        }),
      ).to.be.revertedWith(
        "Please submit the asking price in order to complete the purchase",
      );
    });

    it("Should handle multiple transactions for the same user", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create multiple tokens
      await marketplace.createToken("tokenURI1", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.createToken("tokenURI2", auctionPrice, {
        value: listingPrice,
      });

      // Buy both tokens
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(2, {
        value: auctionPrice,
      });

      // Check user's NFTs
      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts.length).to.equal(2);
    });

    it("Should return empty array for user with no NFTs", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );

      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts.length).to.equal(0);
    });

    it("Should return empty array for user with no listed items", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );

      const listedItems = await marketplace
        .connect(otherAccount)
        .fetchItemsListed();
      expect(listedItems.length).to.equal(0);
    });
  });

  describe("Complete Branch Coverage Tests", function () {
    it("Should handle resell token with incorrect listing price", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create and sell token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Try to resell with wrong listing price
      await expect(
        marketplace.connect(otherAccount).resellToken(1, auctionPrice, {
          value: ethers.parseEther("0.01"),
        }),
      ).to.be.revertedWith("Price must be equal to listing price");
    });

    it("Should handle fetchMarketItems with no unsold items", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Buy the token
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Check market items
      const items = await marketplace.fetchMarketItems();
      expect(items.length).to.equal(0);
    });

    it("Should handle multiple token operations in sequence", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");
      const newPrice = ethers.parseEther("2");

      // Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Buy token
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Resell token
      await marketplace.connect(otherAccount).resellToken(1, newPrice, {
        value: listingPrice,
      });

      // Verify market item details
      const items = await marketplace.fetchMarketItems();
      expect(items.length).to.equal(1);
      expect(items[0].price).to.equal(newPrice);
      expect(items[0].sold).to.equal(false);
    });

    it("Should verify token ownership changes through the process", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Check initial ownership (should be marketplace contract)
      const items = await marketplace.fetchMarketItems();
      expect(items[0].owner).to.equal(await marketplace.getAddress());

      // Buy token
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Check ownership after sale
      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts[0].owner).to.equal(otherAccount.address);
    });

    it("Should handle multiple resell attempts", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create and sell token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Try to resell without owning
      await expect(
        marketplace.resellToken(1, auctionPrice, {
          value: listingPrice,
        }),
      ).to.be.revertedWith("Only item owner can perform this operation");

      // Complete the sale
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Now resell should work
      await marketplace.connect(otherAccount).resellToken(1, auctionPrice, {
        value: listingPrice,
      });
    });
  });

  describe("Final Branch Coverage Tests", function () {
    it("Should handle market sale of non-existent token", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const auctionPrice = ethers.parseEther("1");

      // Try to buy non-existent token
      await expect(
        marketplace.connect(otherAccount).createMarketSale(999, {
          value: auctionPrice,
        }),
      ).to.be.reverted;
    });

    it("Should verify all states in complete marketplace cycle", async function () {
      const { marketplace, owner, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");
      const newPrice = ethers.parseEther("2");

      // 1. Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Verify initial state
      let items = await marketplace.fetchMarketItems();
      expect(items[0].sold).to.equal(false);
      expect(items[0].seller).to.equal(owner.address);
      expect(items[0].owner).to.equal(await marketplace.getAddress());

      // 2. Buy token
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // Verify post-sale state
      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts[0].sold).to.equal(true);
      expect(myNfts[0].owner).to.equal(otherAccount.address);
      expect(myNfts[0].seller).to.equal(ethers.ZeroAddress);

      // 3. Resell token
      await marketplace.connect(otherAccount).resellToken(1, newPrice, {
        value: listingPrice,
      });

      // Verify resell state
      items = await marketplace.fetchMarketItems();
      expect(items[0].sold).to.equal(false);
      expect(items[0].seller).to.equal(otherAccount.address);
      expect(items[0].owner).to.equal(await marketplace.getAddress());
      expect(items[0].price).to.equal(newPrice);
    });

    it("Should handle zero address cases", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create and sell token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Buy token and verify seller address is set to zero
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts[0].seller).to.equal(ethers.ZeroAddress);
    });

    it("Should handle multiple token counts correctly", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create multiple tokens
      for (let i = 0; i < 3; i++) {
        await marketplace.createToken(`tokenURI${i}`, auctionPrice, {
          value: listingPrice,
        });
      }

      // Buy some tokens
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(2, {
        value: auctionPrice,
      });

      // Verify counts
      const marketItems = await marketplace.fetchMarketItems();
      expect(marketItems.length).to.equal(1); // One unsold token

      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts.length).to.equal(2); // Two bought tokens
    });
  });

  describe("Advanced Branch Coverage Tests", function () {
    it("Should handle consecutive resell attempts with price variations", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create and sell token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // First sale
      await marketplace.connect(otherAccount).createMarketSale(1, {
        value: auctionPrice,
      });

      // 修改：先测试错误的 listing fee
      await expect(
        marketplace.connect(otherAccount).resellToken(1, auctionPrice, {
          value: 0,
        }),
      ).to.be.revertedWith("Price must be equal to listing price");

      // 修改：再测试零价格
      await expect(
        marketplace.connect(otherAccount).createToken("tokenURI", 0, {
          value: listingPrice,
        }),
      ).to.be.revertedWith("Price must be at least 1");
    });

    it("Should handle market item creation edge cases", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const listingPrice = await marketplace.getListingPrice();

      // Try to create token with maximum possible price
      const maxPrice = ethers.MaxUint256;
      await marketplace.createToken("tokenURI", maxPrice, {
        value: listingPrice,
      });

      const items = await marketplace.fetchMarketItems();
      expect(items[0].price).to.equal(maxPrice);
    });

    it("Should verify all possible states in fetchMarketItems", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create multiple tokens with different states
      // Token 1: Listed
      await marketplace.createToken("tokenURI1", auctionPrice, {
        value: listingPrice,
      });

      // Token 2: Sold
      await marketplace.createToken("tokenURI2", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(2, {
        value: auctionPrice,
      });

      // Token 3: Listed after resell
      await marketplace.createToken("tokenURI3", auctionPrice, {
        value: listingPrice,
      });
      await marketplace.connect(otherAccount).createMarketSale(3, {
        value: auctionPrice,
      });
      await marketplace.connect(otherAccount).resellToken(3, auctionPrice, {
        value: listingPrice,
      });

      // Verify market items
      const marketItems = await marketplace.fetchMarketItems();
      expect(marketItems.length).to.equal(2); // Should only show token 1 and 3

      // Verify my NFTs
      const myNfts = await marketplace.connect(otherAccount).fetchMyNFTs();
      expect(myNfts.length).to.equal(1); // Should only show token 2
    });

    it("Should handle complex ownership transitions", async function () {
      const { marketplace, otherAccount } = await loadFixture(
        deployMarketplaceFixture,
      );
      const listingPrice = await marketplace.getListingPrice();
      const auctionPrice = ethers.parseEther("1");

      // Create token
      await marketplace.createToken("tokenURI", auctionPrice, {
        value: listingPrice,
      });

      // Multiple ownership transfers
      for (let i = 0; i < 3; i++) {
        // Buy
        await marketplace.connect(otherAccount).createMarketSale(1, {
          value: auctionPrice,
        });

        // Resell
        await marketplace.connect(otherAccount).resellToken(1, auctionPrice, {
          value: listingPrice,
        });
      }

      // Verify final state
      const items = await marketplace.fetchMarketItems();
      expect(items[0].seller).to.equal(otherAccount.address);
      expect(items[0].owner).to.equal(await marketplace.getAddress());
    });

    it("Should handle listing price updates with edge cases", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);

      // Update to minimum value
      await marketplace.updateListingPrice(1);
      expect(await marketplace.getListingPrice()).to.equal(1);

      // Update to large value
      const largePrice = ethers.parseEther("1000");
      await marketplace.updateListingPrice(largePrice);
      expect(await marketplace.getListingPrice()).to.equal(largePrice);
    });
  });
});
