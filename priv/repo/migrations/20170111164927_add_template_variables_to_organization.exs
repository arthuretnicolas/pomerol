defmodule Pomerol.Repo.Migrations.AddTemplateVariablesToOrganization do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      add :button_color, :string, default: "#006699", null: false
      add :highlight_color, :string, default: "#EEF4F8", null: false
      add :background_color, :string, default: "#FFFFFF", null: false

      add :contact_inc_details, :boolean, default: false, null: false
      add :contact_format, :string, default: "columns", null: false

      add :show_pdf, :boolean, default: false, null: false
      add :pdf_page_size, :string

      add :layout_aligned, :string, default: "left", null: false

      add :font_heading, :string, default: "helvetica", null: false
      add :font_weight, :string, default: "bold", null: false
      add :font_body, :string, default: "helvetica", null: false
    end
  end
end
