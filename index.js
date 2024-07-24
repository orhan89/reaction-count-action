const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const reaction = core.getInput('reaction');
        const issue = github.context.issue;

        const octokit = new github.GitHub(token);

        const { data: reactions } = await octokit.reactions.listForIssue({
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
