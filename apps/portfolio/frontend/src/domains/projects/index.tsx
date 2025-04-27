"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { type IProject, projects } from "./data";
import { Background } from "../assets";
import RenderModel from "@/libs/ui/render-model";
import { Staff } from "../models/staff";
import { groupBy } from "lodash-es";
import MarkdownRenderer from "@/libs/ui/markdown-renderer";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.5,
    },
  },
};

const yearContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const Projects = () => {
  // Group projects by year
  const projectsByYear = groupBy(projects, (project) =>
    new Date(project.date).getFullYear(),
  );

  // Sort years in descending order
  const sortedYears = Object.keys(projectsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  return (
    <>
      <Background
        fill
        priority
        className="!fixed top-0 left-0 h-full w-full object-cover object-center opacity-50"
        sizes="100vw"
        variant="projects"
      />

      <div className="fixed top-16 left-1/2 -z-10 flex h-screen -translate-x-1/2 items-center justify-center lg:top-20 lg:-left-24 lg:translate-x-0">
        <RenderModel>
          <Staff />
        </RenderModel>
      </div>

      <div className="px-6 py-20 md:px-12 lg:px-32">
        <motion.div
          animate="show"
          className="mx-auto max-w-7xl"
          initial="hidden"
          variants={container}
        >
          {sortedYears.map((year) => (
            <motion.div
              key={year}
              animate="show"
              className="mb-12"
              initial="hidden"
              variants={yearContainer}
            >
              <motion.h2
                className="mb-6 border-b border-muted pb-2 text-2xl font-bold text-foreground"
                variants={item}
              >
                {year}
              </motion.h2>
              <motion.div className="grid grid-cols-1 gap-6 lg:gap-8">
                {projectsByYear[year].map((project) => (
                  <Project key={project.name} project={project} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface IProjectLayoutProps {
  project: IProject;
}

const Project = ({ project }: IProjectLayoutProps) => {
  const { name, overview, skills, contributions, link, images } = project;
  const hasLink = !!link;
  const hasImages = images && images.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasMarkdown =
    overview.includes("#") || overview.includes("-") || overview.includes("|");

  const baseClasses = `
    bg-control/90 relative flex h-full transform flex-col 
    overflow-hidden rounded-lg p-6 backdrop-blur-sm transition-all duration-300
    ${hasLink ? "hover:-translate-y-1 hover:shadow-lg hover:bg-control" : "opacity-95"}
    ${hasMarkdown ? "lg:p-8" : ""}
  `;

  const renderProjectContent = () => (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-shadow text-xl font-semibold text-foreground/95">
          {name}
        </h3>
      </div>

      {hasSkills && (
        <div className="mb-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <MarkdownRenderer
        className="flex-grow text-base text-foreground/85"
        content={overview}
      />

      <MarkdownRenderer
        className="mt-4 text-base text-foreground/85"
        content={contributions}
      />

      {hasImages && (
        <div className="mt-8 space-y-6">
          <h4 className="text-lg font-semibold text-foreground">
            Project Screenshots
          </h4>

          {/* Group images by type */}
          {(() => {
            const desktopImages = images.filter((img) => img.type !== "mobile");
            const mobileImages = images.filter((img) => img.type === "mobile");

            return (
              <>
                {desktopImages.length > 0 && (
                  <div className="space-y-4">
                    {mobileImages.length > 0 && (
                      <h5 className="text-base font-medium text-foreground/85">
                        Desktop
                      </h5>
                    )}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {desktopImages.map((image, index) => {
                        const imageContainerClasses = `
                          group block overflow-hidden rounded-lg border border-accent/20 
                          bg-background/30 transition-all duration-300 
                          hover:border-accent/40 hover:shadow-glass-sm
                        `;

                        const ImageContent = (
                          <>
                            <div className="relative aspect-video overflow-hidden">
                              <img
                                alt={image.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                src={image.src}
                              />
                            </div>
                            <div className="p-3">
                              <h5 className="text-foreground">{image.title}</h5>
                              {image.link && (
                                <span className="mt-1 inline-block text-xs text-foreground/70">
                                  Click to view
                                </span>
                              )}
                            </div>
                          </>
                        );

                        return image.link ? (
                          <a
                            key={index}
                            className={imageContainerClasses}
                            href={image.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {ImageContent}
                          </a>
                        ) : (
                          <div key={index} className={imageContainerClasses}>
                            {ImageContent}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {mobileImages.length > 0 && (
                  <div className="space-y-4">
                    {desktopImages.length > 0 && (
                      <h5 className="text-base font-medium text-foreground/85">
                        Mobile
                      </h5>
                    )}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
                      {mobileImages.map((image, index) => {
                        const ImageContent = (
                          <>
                            <div className="mockup-phone border-primary">
                              <div className="mockup-phone-camera"></div>
                              <div className="mockup-phone-display">
                                <img alt={image.title} src={image.src} />
                              </div>
                            </div>
                            <div className="p-3">
                              <h5 className="text-foreground">{image.title}</h5>
                              {image.link && (
                                <span className="mt-1 inline-block text-xs text-foreground/70">
                                  Click to view
                                </span>
                              )}
                            </div>
                          </>
                        );

                        return image.link ? (
                          <a
                            key={index}
                            href={image.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {ImageContent}
                          </a>
                        ) : (
                          <div key={index}>{ImageContent}</div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
    </>
  );

  if (!hasLink) {
    return (
      <motion.div className={baseClasses} variants={item}>
        {renderProjectContent()}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      <motion.div variants={item}>
        {renderProjectContent()}

        <div className="mt-6 flex justify-end">
          <Link
            className="inline-flex items-center text-sm font-medium"
            href={link}
            target="_blank"
          >
            View project
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export { Projects };
