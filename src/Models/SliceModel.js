
const SliceModel =
{
  create: (key, divider = 1, isShown = true) => {
    return {
      key,
      divider: Math.min(1, divider), // Cannot go lower than 1 to prevent division by zero
      isShown
    };
  },

  clone: (source) => {
    return SliceModel.create(source.key, source.divider, source.isShown);
  }
};


export default SliceModel;
