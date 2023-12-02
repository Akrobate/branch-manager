const simpleGit = require('simple-git');


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
    
    git.raw(['log', '--pretty=format:%H %P %s']).exec((err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        const commits = result.split('\n').map(commit => {
            const [hash, parents, message] = commit.split(' ');
            return { hash, parents: parents.split(','), message };
        });

        console.log(commits);
    });
})();


