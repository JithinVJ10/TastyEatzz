const blockUnblockHelper = async (req, res, next, isBlocked,Model) => {
    try {
      const UserId = req.params.id;
  
      const user = await Model.findByIdAndUpdate(
        UserId,
        {
          isBlocked: isBlocked,
        },
        { new: true }
      );
  
      if (user) {
        const message = isBlocked ? "Successfully blocked" : "Successfully unblocked";
        res.status(200).json({ success:true, message });
      } else {
        res.status(500).json({ success:false, message: "Server Error" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export {blockUnblockHelper}