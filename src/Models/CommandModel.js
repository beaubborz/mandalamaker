const CommandModel = {
  create: (name, desc, _do=()=>{alert('Not supported.');}, undo=()=>{alert('Not supported.');}, params={}) => {
      return {
        name,
        desc,
        do: _do,
        undo,
        params
      };
  },
  clone: (command) => {
    return CommandModel.create(
      command.name,
      command.desc,
      command.do,
      command.undo,
      command.params
    );
  }
};

export default CommandModel;
