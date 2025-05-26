import { useEffect, useState } from "react";
import { View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { styles } from "./tags-multi-select.styles";

type Tag = {
	id: string;
	name: string;
};

type Props = {
	selectedTags: string[];
	onChange: (value: string[]) => void;
};

export function TagsMultiSelect({ selectedTags, onChange }: Props) {
	const BASE_URL = "192.168.1.10:3011";

	const [tags, setTags] = useState<Tag[]>([]);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const response = await fetch(
					`http://${BASE_URL}/post/find-all-tags`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const json = await response.json();

				const formattedTags: Tag[] = json.data.map((tag: any) => ({
					id: String(tag.id),
					name: tag.name,
				}));

				setTags(formattedTags);
			} catch (error) {
				console.error("Помилка при завантаженні тегів:", error);
			}
		};

		fetchTags();
	}, []);

	return (
		// style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999 }}
		<View>
			<MultiSelect
				items={tags}
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
				styleTextDropdownSelected={{ paddingLeft: 16 }}
				
			/>
		</View>
	);
}
