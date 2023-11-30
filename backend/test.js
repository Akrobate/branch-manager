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
})();
