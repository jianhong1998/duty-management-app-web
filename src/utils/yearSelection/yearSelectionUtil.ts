import { SelectionOption } from '../../components/common/input/SelectionInput';

export default class YearSelectionUtil {
    static generateYearSelectionOptions(): SelectionOption[] {
        const yearSelectionOptions: SelectionOption[] = [];

        const startYear = 2023;
        const currentYear = new Date().getFullYear();

        for (let year = startYear; year <= currentYear + 1; year++) {
            yearSelectionOptions.push({ label: `${year}`, value: `${year}` });
        }

        return yearSelectionOptions;
    }
}
