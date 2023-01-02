import React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout/index";
import slugCreater from "../util/slugCreater";
import parse from "html-react-parser";

const Article = ({ data }) => {
  return (
    <Layout>
      <div>
        <div className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg !pt-0">
          <div className="max-w-screen-md mx-auto ">
            <div className="text-center">
              <div className="flex gap-3">
                <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase  text-purple-600">
                  {data.category}
                </span>
              </div>
            </div>
            <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
              {data.title}
            </h1>
            <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0 w-10 h-10">
                  <span
                    style={{
                      boxSizing: "inherit",
                      display: "block",
                      overFlow: "hidden",
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
                      alt={data["dc:creator"]}
                      width={0}
                      height={0}
                      sizes="100vw"
                      src="https://avatars.dicebear.com/api/avataaars/900.svg"
                      priority
                      className="rounded-full"
                      style={{
                        position: "absolute",
                        inset: "0px",
                        boxSizing: "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-400">
                    {data["dc:creator"]}npm i html-to-react
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <time
                      className="text-gray-500 dark:text-gray-400"
                      dateTime="2022-10-20T12:28:00.000Z"
                    >
                      {new Date(data.pubDate).toISOString().substring(0, 10)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
          <span
            style={{
              boxSizing: "border-box",
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
              sizes="100vw"
              src="/assets/placeholder.jpg"
              width={0}
              priority
              height={0}
              style={{
                position: "absolute",
                inset: "0px",
                boxSizing: "border-box",
                padding: "0px",
                border: "none",
                margin: "auto",
                display: "block",
                width: "0px",
                height: "0px",
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                minHeight: "100%",
                objectFit: "cover",
              }}
            />
          </span>
        </div>
        <div className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg">
          <article className="max-w-screen-md mx-auto ">
            <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
              <strong>{parse(data.description)}</strong>
              <br></br>
              {parse(data["content:encoded"])}
            </div>
            <div className="flex justify-center mt-7 mb-7">
              <Link
                className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 "
                href="/"
              >
                ← View all posts
              </Link>
            </div>
            <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap">
                <div className="relative flex-shrink-0 w-24 h-24 mt-1 ">
                  <span
                    style={{
                      boxSizing: "border-box",
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
                      alt="ghhj"
                      src="https://avatars.dicebear.com/api/avataaars/900.svg"
                      className="rounded-full"
                      width={100}
                      height={100}
                    />
                  </span>
                </div>
                <div>
                  <div className="mb-3">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                      About {data["dc:creator"]}
                    </h4>
                  </div>
                  <div>
                    <p>some text upon writer.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ resolvedUrl }) {
  try {
    const xml2js = require("xml2js");
    const res = await fetch("https://dev98.de/feed/");
    const data = await res.text();
    const feedData = await xml2js.parseStringPromise(data, {
      explicitArray: false,
    });

    const articles = feedData.rss.channel.item;
    const article = articles.find(
      ({ title }) => slugCreater(title) === decodeURI(resolvedUrl)
    );

    return {
      props: {
        data: article,
        status: 200,
        statusText: "OK",
      },
    };
  } catch (error) {
    return {
      props: { data: null, status: 500, statusText: "Something went wrong!" },
    };
  }
}

export default Article;
