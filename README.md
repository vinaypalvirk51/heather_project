# heather_project

Git & Terraform Troubleshooting Notes
Core Problem: Trying to push large Terraform provider binaries (.exe files) from .terraform/ to GitHub, which has a 100MB file size limit per file.

Goal: Remove these large files from Git history and prevent future commits of them.

Solution Steps & Key Commands:

Ensure .gitignore is Correct & Committed:

Location: C:\heather_project\.gitignore (root of your Git repo).
Content:
Code snippet

# Terraform-related files to ignore
.terraform/
*.tfstate
*.tfstate.*.backup
Command: git add .gitignore && git commit -m "Add .terraform/ to .gitignore" (if not already committed).
Clean Local .terraform/ Folder:

Manually delete the downloaded provider binaries to prevent accidental re-inclusion.
Command (PowerShell): Remove-Item -Path ".\terraform\.terraform" -Recurse -Force -ErrorAction SilentlyContinue
Purge Large Files from Git History:

This is the critical step to remove files from past commits.
Install git-filter-repo (if needed): pip install git-filter-repo (in a new PowerShell/CMD window).
Confirm Branch: Ensure you are on the correct branch (dev).
Command: git filter-repo --path terraform/.terraform/ --invert-paths --force
Re-Establish Git Remote (origin):

git-filter-repo can sometimes remove remote configurations.
Check existing remotes: git remote -v (if empty or incorrect).
Add/Re-add remote: git remote add origin https://github.com/vinaypalvirk51/heather_project.git (Use your actual repo URL).
Verify again: git remote -v
Force Push Cleaned History:

Since history was rewritten, you must force push.
Command: git push origin dev --force
After Successful Push:

Local Terraform Init: Run terraform init to re-download provider binaries. Git will now correctly ignore them.
Key Takeaways:

.terraform/ folder (and its contents) should NEVER be committed to Git.
terraform.lock.hcl SHOULD be committed (it locks provider versions).
git filter-repo is for deep history cleaning.
Force pushing (--force) is necessary after rewriting history, but use with caution on shared branches.