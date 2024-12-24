import React from "react";
import DataList from "./dataList";
import AddPostForm from "../componemts/forms/AddPostForm";

const Home = () => {
  return (
    <div>
      <h1>Supabase Data</h1>
      <AddPostForm tableName="posts" />
      <DataList tableName="posts" />
    </div>
  );
};

export default Home;
