import Translator from './translator';
import { User, ContentType, Content } from './interfaces';

const en = {
    'user.content.assigned.message': '',
    'assigned_users.completed.message': '',
    'user.content.liked_count.message': ''
};
describe('Translator', () => {
    const translator = new Translator('en', en);

    /**
     * ____ has assigned a/an ____ to _____ person/people
     */
    describe('User Content Assign Message', () => {
        test("should return 'Farah Asghar has assigned a learning path to 0 people.'", () => {
            const user: User = {
                firstName: 'Farah',
                lastName: 'Asghar'
            };
            const assigneesCount = 0;
            const contentType: ContentType = 'LearningPath';
            expect(
                translator.get('user.content.assigned.message', {
                    ...user,
                    assigneesCount,
                    contentType
                })
            ).toBe('Farah Asghar has assigned a learning path to 0 people.');
        });
        test("should return 'Alex Torres has assigned a piece of audio to 1 person.'", () => {
            const user: User = {
                firstName: 'Alex',
                lastName: 'Torres'
            };
            const assigneesCount = 1;
            const contentType: ContentType = 'Audio';
            expect(
                translator.get('user.content.assigned.message', {
                    ...user,
                    assigneesCount,
                    contentType
                })
            ).toBe('Alex Torres has assigned a piece of audio to 1 person.');
        });
        test("should return 'James Masters has assigned an image to 5 people.'", () => {
            const user: User = {
                firstName: 'James',
                lastName: 'Masters'
            };
            const assigneesCount = 5;
            const contentType: ContentType = 'Images';
            expect(
                translator.get('user.content.assigned.message', {
                    ...user,
                    assigneesCount,
                    contentType
                })
            ).toBe('James Masters has assigned an image to 5 people.');
        });
    });

    /**
     * ____ has/have completed "___"
     */
    describe('Assigned Users Completed Message', () => {
        test('should return \'No one has completed "Intro to Arabic"\'', () => {
            const assigneesCount = 0;
            const assignmentTitle = 'Intro to Arabic';
            expect(
                translator.get('assigned_users.completed.message', {
                    assigneesCount,
                    assignmentTitle
                })
            ).toBe('No one has completed "Intro to Arabic"');
        });

        test('should return \'Only you have completed "Cooking 101"\'', () => {
            const assigneesCount = 1;
            const assignmentTitle = 'Cooking 101';
            expect(
                translator.get('assigned_users.completed.message', {
                    assigneesCount,
                    assignmentTitle
                })
            ).toBe('Only you have completed "Cooking 101"');
        });

        test('should return \'You and one other person have completed "The Gulag Archipelago"\'', () => {
            const assigneesCount = 2;
            const assignmentTitle = 'The Gulag Archipelago';
            expect(
                translator.get('assigned_users.completed.message', {
                    assigneesCount,
                    assignmentTitle
                })
            ).toBe('You and one other person have completed "The Gulag Archipelago"');
        });

        test('should return \'You and 4 other people have completed "Graph Theory - Vertex v.s. Node"\'', () => {
            const assigneesCount = 5;
            const assignmentTitle = 'Graph Theory - Vertex v.s. Node';
            expect(
                translator.get('assigned_users.completed.message', {
                    assigneesCount,
                    assignmentTitle
                })
            ).toBe('You and 4 other people have completed "Graph Theory - Vertex v.s. Node"');
        });
    });

    /**
     * "____" is the #st/nd/rd/th ____ you've liked today!
     */
    describe('User Liked Content Message', () => {
        test('should be `"Why I stopped eating Trader Joe\'s mustard and you should too" is the 1st learning path you\'ve liked today!`', () => {
            const likeCount = 1;
            const content: Content = {
                title: "Why I stopped eating Trader Joe's mustard and you should too",
                type: 'LearningPath'
            };
            expect(
                translator.get('user.content.liked_count.message', {
                    likeCount,
                    ...content
                })
            ).toBe(
                '"Why I stopped eating Trader Joe\'s mustard and you should too" is the 1st learning path you\'ve liked today!'
            );
        });
        test('should be `"Is it really safe to give my toddler brass knuckles?" is the 2nd piece of audio you\'ve liked today!`', () => {
            const likeCount = 2;
            const content: Content = {
                title: 'Is it really safe to give my toddler brass knuckles?',
                type: 'Audio'
            };
            expect(
                translator.get('user.content.liked_count.message', {
                    likeCount,
                    ...content
                })
            ).toBe(
                '"Is it really safe to give my toddler brass knuckles?" is the 2nd piece of audio you\'ve liked today!'
            );
        });
        test('should be `"Babushka Lady" is the 3rd image you\'ve liked today!`', () => {
            const likeCount = 3;
            const content: Content = {
                title: 'Babushka Lady',
                type: 'Images'
            };
            expect(
                translator.get('user.content.liked_count.message', {
                    likeCount,
                    ...content
                })
            ).toBe('"Babushka Lady" is the 3rd image you\'ve liked today!');
        });
        test('should be `"The Seed Potatoes of Leningrad" is the 5th piece of audio you\'ve liked today!`', () => {
            const likeCount = 5;
            const content: Content = {
                title: 'The Seed Potatoes of Leningrad',
                type: 'Audio'
            };
            expect(
                translator.get('user.content.liked_count.message', {
                    likeCount,
                    ...content
                })
            ).toBe('"The Seed Potatoes of Leningrad" is the 5th piece of audio you\'ve liked today!');
        });
        test('should be `"Glucose v.s. Galactose: An Introduction to Isomers" is the 21st learning path you\'ve liked today!`', () => {
            const likeCount = 21;
            const content: Content = {
                title: 'Glucose v.s. Galactose: An Introduction to Isomers',
                type: 'LearningPath'
            };
            expect(
                translator.get('user.content.liked_count.message', {
                    likeCount,
                    ...content
                })
            ).toBe(
                '"Glucose v.s. Galactose: An Introduction to Isomers" is the 21st learning path you\'ve liked today!'
            );
        });
        test('should be `"Terror bird (Titanis walleri) attacking Hell pig (Entelodont)" is the 22nd image you\'ve liked today!`', () => {
            const likeCount = 22;
            const content: Content = {
                title: 'Terror bird (Titanis walleri) attacking Hell pig (Entelodont)',
                type: 'Images'
            };
            expect(
                translator.get('user.content.liked_count.message', {
                    likeCount,
                    ...content
                })
            ).toBe(
                '"Terror bird (Titanis walleri) attacking Hell pig (Entelodont)" is the 22nd image you\'ve liked today!'
            );
        });
    });
});
