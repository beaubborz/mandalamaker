import CommandModel from '../../../Models/CommandModel';

const LineTool = {
  create: () => {
    return {
      name: 'LineTool',
      getCommand: ()=>{
        return CommandModel.create(
          "Create line", // Name
          "Create a line linking points together.", // Desc
          () => { // Code for the actual command
            alert('LineTool');
          },
          () => { // Code to undo the command
            alert('undo line tool');
          }
        );
      }
    };
  },
}

export default LineTool;
