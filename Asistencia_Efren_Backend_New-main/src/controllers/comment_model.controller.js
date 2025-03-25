const CommentModelService = require('../services/comment_model.services'); 

class CommentModelController {
  async create(req, res, next) {
    try {
      const commentData = await CommentModelService.create(req); 
      return res.status(201).json({
        success: true,
        message: 'Comment created successfully',
        data: commentData.data,
      });
    } catch (error) {
      next(error); 
    }
  }

  async findByModel(req, res, next) {
    try {
      const { id_model } = req.params; 
      const comments = await CommentModelService.findByModel(id_model);
      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByUser(req, res, next) {
    try {
      const { id_user } = req.params; 
      const comments = await CommentModelService.findByUser(id_user);
      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params; 
      const updatedComment = await CommentModelService.update(id, req);
      return res.status(200).json({
        success: true,
        message: 'Comment updated successfully',
        data: updatedComment.data,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params; 
      const response = await CommentModelService.delete(id);
      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async countCommentsForModel(req, res, next) {
    try {
      const { id_model } = req.params;
      const count = await CommentModelService.countCommentsForModel(id_model);
      return res.status(200).json({
        success: true,
        count: count.count,
      });
    } catch (error) {
      next(error);
    }
  }

  async countCommentsForUser(req, res, next) {
    try {
      const { id_user } = req.params;
      const count = await CommentModelService.countCommentsForUser(id_user);
      return res.status(200).json({
        success: true,
        count: count.count,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentModelController();
