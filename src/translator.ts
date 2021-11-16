import MessageFormat from '@messageformat/core';
import { pipe } from 'rxjs';

import { Messages } from './interfaces';

export default class TranslationInstance {
    private messageFormat: MessageFormat;

    private messages: Messages;

    constructor(locale: string, messages: Messages) {
        this.messageFormat = new MessageFormat(locale);
        this.messages = messages;
    }

    /**
     * Determines if translation `key`ß and associated value exists for the TranslationInstance's locale
     */
    has(key: string) {
        return !!this.messages[key];
    }

    /**
     * Translates the string associated to given `key` using `params` for interpolation and MessageFormat formatters
     */
    get(key: string, params?: any) {
        const message = this.messages[key];
        if (message) {
            return pipe(this.stripMarkup, this.formatInterpolation, this.compile)(message)(params);
        }
    }

    /**
     * Compiles MessageFormat value into a function that can be used to generate a translation w/ params
     */
    compile = (message: string) => this.messageFormat.compile(message);

    /**
     * Finds and replaces all instances of double bracket interpolation with single bracket.
     * Double bracket interpolation was added to transloco on web for backwards compatibliity with previous translations.
     */
    formatInterpolation = (message: string) => {
        message.match(/\{{2}[a-zA-Z0-9_]*\}{2}/g)?.forEach((substring) => {
            message = message.replace(substring, substring.slice(1, -1));
        });
        return message;
    };

    /**
     * Finds and removes all transloco tags for markup transpilers
     * @todo determine if this is something we need, and if so, how it can be accomplished.
     */
    stripMarkup = (message: string) => {
        let markup: RegExpMatchArray;
        let contents: RegExpMatchArray;
        do {
            markup = message.match(/\[(\w+)(:[\w-]+)?\].*\[\/\1\]/g) ?? []; // matches markup tag pairs and all content between e.g. [color:white]...[/color]
            contents = message.match(/(?<=\[(\w+)(:[\w-]+)?\]).*(?=\[\/\1\])/g) ?? []; // matches content between markup tag pairs
            markup?.forEach((substring, index) => {
                message = message.replace(substring, contents[index]); // replace markup with justs its contents
            });
        } while (markup?.length && contents?.length); // ensure nested markup is stripped
        return message;
    };
}
