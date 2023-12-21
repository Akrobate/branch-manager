const simpleGit = require('simple-git');
const path = require('path');
const os = require('os');

const {
    GitService,
} = require('./src/services/GitServiceV2');


(async () => {

    const git_service = GitService.getInstance();

    const git_url = '';
    const path_to_git = '';
    const ssh_key_file_path = '';

    const GIT_SSH_COMMAND = git_service
        .generateSshCommand(ssh_key_file_path);

    const result = await git_service
        .cloneCommand(git_url, path_to_git, GIT_SSH_COMMAND);

    console.log(result);

})();


// GIT_SSH_COMMAND='ssh -i private_key_file -o IdentitiesOnly=yes' git clone user@host:repo.git

/*
(async () => {


    const git = simpleGit('./data/projects/telegram-bot/',
        {
            binary: 'git',
        }
    );

    let res = '';
    res = await git.log({});
    console.log(res);

    res = await git.branch();
    console.log(res);


    res = await git.checkout('develop');
    console.log(res);

    // Testing //
    res = await git.raw(['log', '--pretty=format:%H__SPLIT_CHAR__%P__SPLIT_CHAR__%s']);

    const commits = res.split('\n').map((commit) => {
        const [hash, parents, message] = commit.split('__SPLIT_CHAR__');
        return {
            hash,
            parents: parents ? parents.split(',') : [],
            message,
        };
    });

    console.log(commits);

})();


async function cloneRepo() {

    const projectKey = 'here';
    const gitSSH = 'FILL YOUR SSH GIT ADDRESS';
    const sourceDir = path.resolve(`${os.tmpdir()}/${projectKey}`);
    const sshKnownHosts = path.resolve(`${process.cwd()}/settings/ssh/known_hosts`);
    const sshKey = path.resolve(`${process.cwd()}/settings/ssh/id_ed25519`);

    const GIT_SSH_COMMAND = `ssh -o UserKnownHostsFile=${sshKnownHosts} -o StrictHostKeyChecking=no -i ${sshKey}`;

    console.log(sourceDir);

    const git = simpleGit()
        .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND);

    await git.clone(gitSSH, sourceDir, ['-b', 'YOUR-BRANCH-NAME', '--single-branch'])
        .then(() => console.log('finished'))
        .catch((err) => console.error('failed: ', err));
}


*/
