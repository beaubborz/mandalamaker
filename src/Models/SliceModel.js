
const SliceModel =
{
  create: (key, divider = 1, isEditing = false, isShown = true) => {
    return {
      key,
      divider: Math.min(1, divider), // Cannot go lower than 1 to prevent division by zero
      isEditing,
      isShown
    };
  },

  clone: (source) => {
    return SliceModel.create(source.key, source.divider, source.isEditing, source.isShown);
  }
};


export default SliceModel;
