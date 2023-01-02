import React from "react";
import Image from "next/image";
import Link from "next/link";
import slugCreater from "../../util/slugCreater";

const CardHolder = ({ title, creator, category, dateObject }) => {
  const slug = slugCreater(title);

  return (
    <>
      <div className="cursor-pointer group">
        <div className="relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105 aspect-square">
          <Link href={slug}>
            <span
              style={{
                boxSizing: "inherit",
                display: "block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: "0px",
                margin: "0px",
                padding: "0px",
                position: "absolute",
                inset: "0px",
              }}
            >
              <Image
                alt="Thumbnail"
                sizes="80vw"
                src="/assets/placeholder.jpg"
                className="transition-all"
                width={100}
                height={100}
                priority
                style={{
                  position: "absolute",
                  inset: "0px",
                  boxSizing: "inherit",
                  padding: "0px",
                  border: "none",
                  margin: "auto",
                  display: "block",
                  width: "0px",
                  height: "0px",
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </span>
          </Link>
        </div>
        <div className="flex gap-3">
          <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase  text-blue-600">
            {typeof category === typeof [] ? category.join(", ") : category}
          </span>

          {/* <a href="/#">
            <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase  text-purple-600">
              Lifestyle
            </span>
          </a> */}
        </div>
        <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
          <span className=" bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
            <Link href={slug}> {title}</Link>
          </span>
        </h2>
        <div className="hidden">
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            It is a cliche philosophical question, but it touches on something
            fundamental about how humans relate to the world around them.
          </p>
        </div>
        <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 w-5 h-5">
              <span
                style={{
                  boxSizing: "inherit",
                  display: "block",
                  overflow: "hidden",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: "0px",
                  margin: "0px",
                  padding: "0px",
                  position: "absolute",
                  inset: "0px",
                }}
              >
                <Image
                  alt={creator}
                  src="https://avatars.dicebear.com/api/avataaars/3.svg"
                  className="rounded-full"
                  width={100}
                  height={100}
                />
              </span>
            </div>
            <span className="text-sm">{creator}</span>
          </div>
          <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
          <time className="text-sm" dateime="2022-10-21T06:05:00.000Z">
            {new Date(dateObject).toISOString().substring(0, 10)}
          </time>
        </div>
      </div>
    </>
  );
};

export default CardHolder;
