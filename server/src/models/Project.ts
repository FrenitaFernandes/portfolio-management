import { Schema, model } from 'mongoose'

const projectSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		tech: [{ type: String }],
		link: { type: String },
	},
	{ timestamps: true },
)

export default model('Project', projectSchema)
