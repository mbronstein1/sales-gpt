-- DropForeignKey
ALTER TABLE "CompanyContent" DROP CONSTRAINT "CompanyContent_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyContent" DROP CONSTRAINT "CompanyContent_contentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyContent" ADD CONSTRAINT "CompanyContent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyContent" ADD CONSTRAINT "CompanyContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
