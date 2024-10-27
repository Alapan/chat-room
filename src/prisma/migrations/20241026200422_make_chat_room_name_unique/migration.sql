/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_topic_key" ON "ChatRoom"("topic");
