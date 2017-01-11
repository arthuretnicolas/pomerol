defmodule Pomerol.OrganizationTransactionalEmailView do
  use Pomerol.Web, :view

  def render("show.json", %{organization_transactional_email: organization_transactional_email}) do
    %{
      id: organization_transactional_email.id,
      type: organization_transactional_email.type,
      subject: organization_transactional_email.subject,
      body: organization_transactional_email.body,
      footer: organization_transactional_email.footer,
      organization_id: organization_transactional_email.organization_id
    }
  end
end
