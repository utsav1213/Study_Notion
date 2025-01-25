const Category=require("../models/Category");

exports.createCategory= async(req,res)=>{
   try{
    const {name,description}=req.body;
    if(!name){
        return res.status(400)
        .json({message:"All fields are required"});
    }
    const CategoryDetails = await Category.create({
        name:name,
        description:description,
    });
    return res.status(200).json({
        success:ture,
        message:"categorys Created Successfully",
    })
   } catch (error) {
    return res.status(500).json({
        success: true,
        message: error.message,
    });
}
};

exports.showAllCategories = async(req,res)=>{
  try{
    const allcategories= await Category.find({});
    res.status(200).json({
        success:true,
        data:allcategories,
    })
  
}catch(error){
 return res.status(500).json({
    success:false,
    message:error.message,
 })   
}
};

//categoryPageDetails

exports.categoryPageDetails = async(req,res)=>{
    try{
          const {CategoryId} = req.body;
          const selectedCategory= await Category.findById(CategoryId).populate("courses").exec();

            if(!selectedCategory){
                return res.status(404).json({
                    success:false,
                    message:"Data Not Found",
                })
            }
            const differentCategories = await Category.find({
                _id: {$ne: categoryId},
                })
                .populate("courses")
                .exec();

                return res.status(200).json({
                    success:true,
                    data:{
                        selectedCategory,
                        differentCategories,
                    }
                });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
}

