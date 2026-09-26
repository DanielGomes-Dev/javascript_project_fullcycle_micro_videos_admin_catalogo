import Entity from '../../shared/domain/entity/entity.ts';
import UniqueEntityId from '../../shared/domain/value-objects/unique-entity-id.vo.ts';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}


export class Category extends Entity<CategoryProperties> {

    constructor(
        public readonly props: CategoryProperties, id?: UniqueEntityId
    ) {
        super(props, id)
        // Adicionar props a category
        this.props.name = props.name;
        this.props.description = props.description ?? "";
        this.props.is_active = props.is_active ?? true;
        this.props.created_at = props.created_at ?? new Date();

    }

    update(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    activate() {
        this.is_active = true;
    }

    deactivate() {
        this.is_active = false;
    }

    get name(): string {
        return this.props.name;
    }

    private set name(name: string) {
        this.props.name = name ?? "";
    }


    get description() {
        return this.props.description;
    }


    private set description(value: string) {
        this.props.description = value ?? "";
    }


    get is_active() {
        return this.props.is_active;
    }

    private set is_active(value: boolean) {
        this.props.is_active = value ?? true;
    }

    get created_at() {
        return this.props.created_at;
    }

    private set created_at(value: Date) {
        this.props.created_at = value ?? new Date();
    }


}


// const category = new Category({
//     name: "nome"
// })

const category = new Category({
    "name": 'test',
    "description": "test232",
    "is_active": true,
    "created_at": new Date()
})


// category.toJSON().id
