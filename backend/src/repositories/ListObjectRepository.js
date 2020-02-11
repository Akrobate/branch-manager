'use strict';

class ListObjectRepository {

    /**
     * @return {ListObjectRepository}
     */
    static getInstance() {
        if (ListObjectRepository.instance === null) {
            ListObjectRepository.instance = new ListObjectRepository();
        }
        return ListObjectRepository.instance;
    }

    /**
     * @param {Object} criteria
     * @param {Array<Object>} data_list
     * @return {Array<Object>}
     */
    search(criteria, data_list) {
        if (criteria === undefined || criteria === null) {
            return data_list;
        }
        return data_list
            .filter((credential) => {
                let criteria_match = true;
                Object.keys(criteria).forEach((criteria_field) => {
                    if (criteria_match
                        && (!(credential[criteria_field] !== undefined
                            && credential[criteria_field] === criteria[criteria_field]))
                    ) {
                        criteria_match = false;
                    }
                });
                return criteria_match;
            });
    }

    /**
     * @param {Integer} id
     * @param {Object} input
     * @param {Array<Object>} data_list
     * @return {Object}
     */
    update(id, input, data_list) {
        const index = data_list.findIndex((data) => data.id === id);
        if (index > -1) {
            data_list[index] = input;
            return data_list;
        }
        return false;
    }

    /**
     * @param {Integer} id
     * @param {Array<Object>} data_list
     * @return {Object}
     */
    delete(id, data_list) {
        const index = data_list.findIndex((data) => data.id === id);
        if (index > -1) {
            data_list.splice(index, 1);
            return data_list;
        }
        return false;
    }

}


ListObjectRepository.instance = null;

module.exports = {
    ListObjectRepository,
};
