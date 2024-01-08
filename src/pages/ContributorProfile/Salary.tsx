import { ContractWriteButton } from "@/components/ContractWriteButton";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useReadSalaryContract, useWriteSalaryContract } from "@/contracts";

const months_id = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Salary = ({ address }: { address: string }) => {
  //   const { data } = useReadSalaryContract({
  //     functionName: "get_claimable_salary",
  //     args: [address, months_id],
  //   });

  // const claimSalary = useWriteSalaryContract("claim_salary");

  return (
    <Box variant="shadow" className="rounded-lg">
      <div className="p-4 border-b border-b-border/20">
        <p className="text-lg font-semibold text-text">Salary</p>
      </div>

      <div className="p-4">
        <p className="text-3xl font-bold text-text">$18480.87</p>
      </div>

      {/* <ContractWriteButton
        className="mb-5 ml-5"
        label="Claim Salary"
        args={[address]}
        {...claimSalary}
      /> */}

      <Button className="mb-5 ml-5">Claim Salary</Button>
    </Box>
  );
};
