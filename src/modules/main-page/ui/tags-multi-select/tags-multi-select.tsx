import { useState } from "react";
import { View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { styles } from "./tags-multi-select.styles";

const defaultTags = [
	{ id: "1", name: "Відпочинок" },
	{ id: "2", name: "Натхнення" },
	{ id: "3", name: "Життя" },
	{ id: "4", name: "Природа" },
	{ id: "5", name: "Читання" },
	{ id: "6", name: "Спокій" },
	{ id: "7", name: "Гармонія" },
	{ id: "8", name: "Музика" },
	{ id: "9", name: "Фільми" },
	{ id: "10", name: "Подорожі" },
];

type Props = {
	selectedTags: string[];
	onChange: (value: string[]) => void;
};

export function TagsMultiSelect({ selectedTags, onChange }: Props) {
	return (
		<View>
			<MultiSelect
				items={defaultTags}
				uniqueKey="id"
				onSelectedItemsChange={onChange}
				selectedItems={selectedTags}
				selectText="Оберіть теги"
				searchInputPlaceholderText="Пошук"
				tagRemoveIconColor="#F43F5E"
				tagBorderColor="#CDCED2"
				tagTextColor="#070A1C"
				selectedItemTextColor="#CDCED2"
				selectedItemIconColor="#CDCED2"
				itemTextColor="#070A1C"
				displayKey="name"
				searchInputStyle={{ color: "#CCC" }}
				submitButtonColor="#543C52"
				submitButtonText="Підтвердити"
				styleTextDropdown={{ paddingLeft: 16 }}
				styleDropdownMenuSubsection={styles.styleDropdownMenuSubsection}
				styleDropdownMenu={styles.styleDropdownMenu}
				styleSelectorContainer={styles.styleSelectorContainer}
				styleListContainer={styles.styleListContainer}
				altFontFamily="GTWalsheimPro-Regular"
				fontFamily="GTWalsheimPro-Regular"
				itemFontFamily="GTWalsheimPro-Regular"
				selectedItemFontFamily="GTWalsheimPro-Regular"
				styleTextDropdownSelected={{paddingLeft: 16}}
			/>
		</View>
	);
}
