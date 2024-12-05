source .env

# Stage all changes
git add .

# Ask for the commit message
echo "Enter commit message: "
read commit_message

# Commit with the provided message
git commit -m "$commit_message"

github_username=$GITHUB_USERNAME
github_token=$GITHUB_TOKEN

# Push the changes
git push https://$github_username:$github_token@github.com/JoaoVictorDevMeta/ListaTarefa-P1.git
