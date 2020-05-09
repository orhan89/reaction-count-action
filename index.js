const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // `who-to-greet` input defined in action metadata file
        const token = core.getInput('token');
        const reaction = core.getInput('reaction');
        console.log(`Reaction: ${reaction}!`);

        const octokit = new github.GitHub(token);

        const reactions = await octokit.reactions.listForIssue({
            github.context.owner,
            github.context.repo,
            github.context.payload.issue.number,
            reaction
        });

        core.setOutput("count", reactions.length);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
