# Stage all changes
git add .

# Ask for the commit message
echo "Enter commit message: "
read commit_message

# Commit with the provided message
git commit -m "$commit_message"

github_username='JoaoVictorDevMeta'
github_token='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'

# Push the changes
git push https://$github_username:$github_token@github.com/JoaoVictorDevMeta/ListaDeTarefaFS.git
