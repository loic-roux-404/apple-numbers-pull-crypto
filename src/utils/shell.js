export const run = command => {
    const app = Application.currentApplication();
    app.includeStandardAdditions = true;

    return app.doShellScript(command)
}

export const getEnv = key => run(`echo $${key}`)
