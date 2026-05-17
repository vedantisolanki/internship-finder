/**
 * @description Calculate matching score based on skill overlap
 * @param {Array} studentSkills 
 * @param {Array} requiredSkills 
 * @returns {Number} Score between 0 and 100
 */
const calculateMatchScore = (studentSkills, requiredSkills) => {
    if (!requiredSkills || requiredSkills.length === 0) return 0;
    if (!studentSkills || studentSkills.length === 0) return 0;

    const matchedSkills = requiredSkills.filter(skill => 
        studentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    );

    const score = (matchedSkills.length / requiredSkills.length) * 100;
    return Math.round(score);
};

module.exports = { calculateMatchScore };
