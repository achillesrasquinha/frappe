import NodeGit from 'nodegit'

const git = { }
git.clone = (repo, dir, options) =>
{
    NodeGit.Clone(repo, dir, options)
}

export default git