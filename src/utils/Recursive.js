class Recursive {
    flatToTree (list, options) {
        if (!list || !Array.isArray(list))  return []

        options = {
            id: "_id",
            parentId: "parent_id",
            children: "children",
            ...options
        }

        const map = {}, roots = []
        let node = {}

        list.forEach((item, idx) => {
            map[item._id] = idx
            item[options.children] = []
        })

        list.forEach(item => {
            node = item
            if (node[options.parentId] !== null) {
                if (map[node[options.parentId]]) list[map[node[options.parentId]]][options.children].push(node)
            } else {
                roots.push(node)
            }
        })

        return roots
    }

    async softDeleteTree (model, id, options) {
        if (!id || !model)  return false

        options = {
            id: '_id',
            parentId: 'parent_id',
            ...options
        }

        try {
            const recursiveMap = async ids => {
                ids.forEach(async id => {
                    await model.softDelete(id)

                    const lstChild = await model.find({ [options.parentId]: id }).lean()

                    if (!lstChild.length) return true

                    return await recursiveMap(lstChild.map(child => child[options.id]))
                });
            }

            await recursiveMap([id])

            return true
        } catch (e) {
            console.error(e.stack)

            return false
        }
    }
}

export default new Recursive()