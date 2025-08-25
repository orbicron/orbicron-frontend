-- DropForeignKey
ALTER TABLE "public"."settlements" DROP CONSTRAINT "settlements_toUserId_fkey";

-- AlterTable
ALTER TABLE "public"."settlements" ADD COLUMN     "blockchainNetwork" TEXT NOT NULL DEFAULT 'testnet',
ADD COLUMN     "piTransactionHash" TEXT,
ADD COLUMN     "receiverPublicKey" TEXT,
ALTER COLUMN "toUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."settlements" ADD CONSTRAINT "settlements_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
