import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_API_JWT });

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const logo = formData.get("logo") as Blob;
    const name = formData.get("name");

    if (!logo) {
      console.error("no logo!");

      return NextResponse.json(
        { message: "No logo received." },
        { status: 400 }
      );
    }

    // hashed name
    const nameHash = name?.toString().replaceAll(" ", "-");

    const logoBuffer = Buffer.from(await logo.arrayBuffer());
    // logo
    const logoRes = await pinata.pinFileToIPFS(Readable.from(logoBuffer), {
      pinataMetadata: {
        name: `${nameHash}-logo`,
      },
    });

    // metadata
    const metadataRes = await pinata.pinJSONToIPFS(
      {
        logo: logoRes.IpfsHash,
        name,
        description: formData.get("description"),
        socials: {
          website: formData.get("website"),
          discord: formData.get("discord"),
        },
      },
      {
        pinataMetadata: {
          name: `${nameHash}-metadata`,
        },
      }
    );

    return Response.json({ cid: metadataRes.IpfsHash });
  } catch (err) {
    console.log("metadata err", err);
    return Response.json({ message: "Error uploading file" }, { status: 500 });
  }
}
