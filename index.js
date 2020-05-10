const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // `who-to-greet` input defined in action metadata file
        const token = core.getInput('token');
        const reaction = core.getInput('reaction');
        const issue = github.context.issue;

        console.log(`Reaction: ${reaction}!`);
        console.log(`Issue: ${issue.owner}!`);
        console.log(`Issue: ${issue.repo}!`);
        console.log(`Issue: ${issue.number}!`);

        const octokit = new github.GitHub(token);

        const reactions = await octokit.reactions.listForIssue({
            ...issue,
            reaction
        });

        octokit.log.error(`Reactions: ${reactions}`);
        octokit.log.error(`Count: ${reactions[0]}`);
        core.setOutput("count", reactions.length);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
