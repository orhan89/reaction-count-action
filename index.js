const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // `who-to-greet` input defined in action metadata file
        const token = core.getInput('token');
        const reaction = core.getInput('reaction');
        const issue = github.context.issue;

        console.log(`Reaction: ${reaction}!`);
        console.log(`Issue: ${issue}!`);

        const octokit = new github.GitHub(token);

        const reactions = await octokit.reactions.listForIssue({
            ...issue,
            reaction
        });

        console.log(reactions);
        console.log(reactions.length);
        core.setOutput("count", reactions.length);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
