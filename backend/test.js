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


