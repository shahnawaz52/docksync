import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    path: text("path").notNull(), // document/project/resume
    size: integer("size").notNull(),
    type: text("type").notNull(), // "folder" (Mime Type)
    fileUrl: text("file_url").notNull(), // url to access file
    thumbnailUrl: text("thumbnail_url"),
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), // Parent folder if (null for root items)
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const filesRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    children: many(files)
}))

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert
