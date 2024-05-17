import Comment from "../models/Comment.js"
// export const createComment = async (req, res) => {
//     const { content, publicationId, userId } = req.body;

//     try {
//         const comment = new Comment({ content, publicationId, userId });
//         await comment.save();

//         res.status(201).json({ message: 'Comment created', comment });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating comment', error });
//     }
// };
export const createComment = async (req, res) => {
    const { content, publicationId } = req.body;
    const { userId } = req.tokenData; // Extraer userId de req.tokenData
    console.log('createComment function called');

    if (!content || content.trim() === '' || !publicationId || !userId) {
        console.log('Missing or invalid required fields');
        return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    try {
        const comment = new Comment({ content, publicationId, userId });
        console.log(`Comment to be saved: ${JSON.stringify(comment)}`);
        await comment.save();
        console.log('Comment saved');
        res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: 'Error creating comment', error });
    }
};


export const getCommentsByPublicationId = async (req, res) => {
    const { publicationId } = req.params;
  
    try {
      const comments = await Comment.find({ publicationId });
      if (comments.length === 0) {
        return res.status(404).json({ message: 'Comments not found' });
      }
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  };

export const getComments = async (req, res) => {    //todos los comentarios
    try {
        const comments = await Comment.find();
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

export const getComment = async (req, res) => {    //byId
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ comment });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment updated', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};


export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};


