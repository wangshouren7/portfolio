"use client";
import { Upload } from "@/modules/ui/upload";
import {
  type IControllableComponentProps,
  useControllableValue,
} from "@pfl-wsr/ui";
import { X } from "lucide-react";
import { useState } from "react";
import { uploadFileToIpfs } from "../ipfs/actions";
import { NftImg } from "../nft-card/nft-img";

export function FileUpload(props: IControllableComponentProps<string>) {
  const [url, onChange] = useControllableValue<string | undefined>(props);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {!url && (
        <Upload
          accept={{
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
          }}
          disabled={loading}
          loading={loading}
          maxFiles={1}
          maxSize={1024 * 1024 * 10}
          multiple={false}
          onDrop={async (files) => {
            const [file] = files;
            if (!file) {
              return;
            }

            setLoading(true);

            try {
              const url = await uploadFileToIpfs(file);
              onChange(url);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      {url && (
        <div className="flex items-center gap-2">
          <NftImg
            className="w-[300px]"
            imgProps={{
              src: url,
              alt: "nft-image",
            }}
          />

          <X className="cursor-pointer" onClick={() => onChange(undefined)} />
        </div>
      )}
    </div>
  );
}
