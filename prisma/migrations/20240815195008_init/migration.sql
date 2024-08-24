-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "tweet_original_id" TEXT;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_tweet_original_id_fkey" FOREIGN KEY ("tweet_original_id") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
