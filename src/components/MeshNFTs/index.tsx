import { Box } from "../ui/box";

export const MeshNFTs = () => {
  return (
    <Box variant="shadow" className="rounded-lg">
      <div className="p-4 border-b border-b-border/20">
        <p className="text-lg font-semibold text-background">Mesh NFTs</p>
      </div>

      <div className="p-4 flex gap-4">
        <img
          alt="nft"
          src="/assets/img/nft.png"
          className="h-full rounded-lg w-96"
        />
        <img
          alt="nft"
          src="/assets/img/nft.png"
          className="h-full rounded-lg w-96"
        />

        <img
          alt="nft"
          src="/assets/img/nft.png"
          className="h-full rounded-lg w-96"
        />
      </div>
    </Box>
  );
};
