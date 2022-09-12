import React from "react";
import { Layout } from "components/layout";
import { EditUser } from "components/editUser";
import Head from "next/head";

export default function EditProfile() {
  return (
    <Layout>
      <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ minHeight: "525px", marginTop: "50px" }}>
        <EditUser />
      </div>
    </Layout>
  );
}
