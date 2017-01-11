defmodule Pomerol.NotificationEmailView do
  use Pomerol.Web, :view

  def render("show.json", %{notification_email: notification_email}) do
    %{
      id: notification_email.id,
      email: notification_email.email,
      type: notification_email.type,
      organization_id: notification_email.organization_id
    }
  end
end
