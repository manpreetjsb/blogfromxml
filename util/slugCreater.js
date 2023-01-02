const slugCreater = (title) => `/${title.replaceAll(/\s+|[,\/]/g, "-")}`;

export default slugCreater;
