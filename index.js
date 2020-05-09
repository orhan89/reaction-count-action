const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // `who-to-greet` input defined in action metadata file
        const token = core.getInput('token');
        const reaction = core.getInput('reaction');
        const issue: {owner: string; repo: string; number: number} = github.context.issue;

        console.log(`Reaction: ${reaction}!`);

        const octokit = new github.GitHub(token);

        const reactions = await octokit.reactions.listForIssue({
            ...issue,
            reaction
        });

        core.setOutput("count", reactions.length);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
