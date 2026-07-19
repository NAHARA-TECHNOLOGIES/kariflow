import { z } from "zod";

export const InquirySchema = z.object({

fullName:

z.string()
.min(2)
.max(80),

email:

z.string()
.email(),

goal:

z.string()
.min(3)
.max(100),

message:

z.string()
.min(10)
.max(2000),

});