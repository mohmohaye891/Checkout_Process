import * as z from "zod";

export const PayoutSchema = z.object({
  cardHolderName: z.string({ message: "Please enter card holder name" }).min(1),
  cardNumber: z
    .string({ message: "Please enter a valid card number" })
    .length(16, { message: "Card number is required" }),
  expiry: z
    .string({ message: "Please enter expiry" })
    .regex(/^(0[1-9]|1[0-2])(\/|-)([0-9]{2})$/, {
      message: "Please enter valid expiry date format MM/YY",
    }),
  cvv: z
    .string({ message: "Please enter cvv" })
    .length(3, { message: "CVV is required" }),
  saveCard: z.boolean().optional(),
});

export type Payout = z.infer<typeof PayoutSchema>;
