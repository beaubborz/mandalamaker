
const SliceModel =
{
  create: (key, divider = 1, isEditing = false, isShown = true) => {
    return {
      key,
      divider,
      isEditing,
      isShown
    };
  },

  clone: (source) => {
    return SliceModel.create(source.key, source.divider, source.isEditing, source.isShown);
  }
};


export default SliceModel;
