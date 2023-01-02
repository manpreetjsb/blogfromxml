import Layout from "../components/Layout/index";
import CardHolder from "../components/Card/index";
import { v4 as uuidv4 } from "uuid";

const Home = ({ data }) => {
  return (
    <Layout>
      <div className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg">
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {data.map((item) => (
            <CardHolder
              key={uuidv4()}
              title={item.title}
              dateObject={item.pubDate}
              creator={item["dc:creator"]}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  try {
    const xml2js = require("xml2js");
    const res = await fetch("https://dev98.de/feed/");
    const data = await res.text();
    const feedData = await xml2js.parseStringPromise(data, {
      explicitArray: false,
    });
    return {
      props: {
        data: feedData.rss.channel.item,
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
export default Home;
